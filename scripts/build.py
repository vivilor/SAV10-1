import shutil
import os

print os.getcwd()
shutil.rmtree('dist')
os.system('npm run build')
shutil.move('../static', './dist/static')
os.rename("./dist/index.html", "./dist/index_old.html")
with open("./dist/index_old.html", "rt") as fin:
    with open("./dist/index.html", "wt") as fout:
        for line in fin:
            fout.write(line.replace('./../../', './'))
os.remove("./dist/index_old.html")
