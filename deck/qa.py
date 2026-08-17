import zipfile, re, sys
from defusedxml import minidom
EMU=914400.0; SW,SH=13.333,7.5
M=0.85; W=SW-2*M; RIGHT=M+W; GUT=0.30
z=zipfile.ZipFile(sys.argv[1])
names=sorted([n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$',n)],
             key=lambda n:int(re.search(r'(\d+)',n).group(1)))
valid_x=set()
for k in (1,2,3,4):
    cwv=(W-GUT*(k-1))/k
    for i in range(k): valid_x.add(round(M+i*(cwv+GUT),2))
issues=[]
def ov(a,b):
    ix=min(a[0]+a[2],b[0]+b[2])-max(a[0],b[0])
    iy=min(a[1]+a[3],b[1]+b[3])-max(a[1],b[1])
    return ix>0.02 and iy>0.02
def inside(a,b):  # a within b
    return a[0]>=b[0]-.01 and a[1]>=b[1]-.01 and a[0]+a[2]<=b[0]+b[2]+.01 and a[1]+a[3]<=b[1]+b[3]+.01
for n in names:
    sn=int(re.search(r'(\d+)',n).group(1))
    doc=minidom.parseString(z.read(n))
    filled=[]
    for sp in doc.getElementsByTagName('p:sp'):
        off=sp.getElementsByTagName('a:off'); ext=sp.getElementsByTagName('a:ext')
        if not off or not ext: continue
        x=int(off[0].getAttribute('x'))/EMU; y=int(off[0].getAttribute('y'))/EMU
        w=int(ext[0].getAttribute('cx'))/EMU; h=int(ext[0].getAttribute('cy'))/EMU
        txt=' '.join(t.firstChild.nodeValue for t in sp.getElementsByTagName('a:t') if t.firstChild)
        lab=(txt[:34] or '<shape>').replace('\n',' ')
        # bounds
        if x<-0.01 or y<-0.01: issues.append((sn,'NEG POS',f'{x:.2f},{y:.2f}',lab))
        if x+w>SW+0.02: issues.append((sn,'PAST RIGHT',f'{x+w:.3f}',lab))
        if y+h>SH+0.02: issues.append((sn,'PAST BOTTOM',f'{y+h:.3f}',lab))
        if x<M-0.02 and w>0.05: issues.append((sn,'LEFT OF MARGIN',f'{x:.3f}',lab))
        if w>0.4 and round(x,2) not in valid_x and abs(x-M)>0.01:
            pass  # inset content inside cards is expected
        # text fit
        szs=[int(r.getAttribute('sz')) for r in sp.getElementsByTagName('a:rPr') if r.getAttribute('sz')]
        if szs and txt and w>0.3:
            pt=max(szs)/100.0
            cpl=max(1,int(w*96/(pt*0.52)))
            lines=sum(max(1,-(-len(p)//cpl)) for p in txt.split('\n'))
            if lines*pt*1.32/72.0>h+0.06:
                issues.append((sn,'TEXT OVERFLOW',f'need {lines*pt*1.32/72.0:.2f} box {h:.2f}',lab))
        # visible filled geometry only
        spPr=sp.getElementsByTagName('p:spPr')
        if spPr and spPr[0].getElementsByTagName('a:solidFill'):
            filled.append((x,y,w,h,lab))
            if w>5.0 and abs((x+w)-RIGHT)>0.02:
                issues.append((sn,'CARD RIGHT EDGE',f'{x+w:.3f} vs {RIGHT:.3f}',lab))
            if w>0.4 and round(x,2) not in valid_x:
                issues.append((sn,'CARD OFF GRID',f'x={x:.3f}',lab))
    for i in range(len(filled)):
        for j in range(i+1,len(filled)):
            a,b=filled[i],filled[j]
            if ov(a,b) and not inside(a,b) and not inside(b,a):
                issues.append((sn,'SHAPES OVERLAP',f'{a[4]}',f'{b[4]}'))
print(f"slides: {len(names)}")
print("clean — no bounds, grid, overlap or overflow problems" if not issues else f"{len(issues)} issue(s):")
for i in issues[:50]: print('  '+' | '.join(str(v) for v in i))
