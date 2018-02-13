// var texturepack = require('./tps/texturepack')
var fs = require('fs');
var path = require('path');
var decamelize = require('decamelize');

let count = 0;

const walk = function(dir)
{
    const files = fs.readdirSync(dir);

    files.forEach((f) =>
    {
        if (f.indexOf('.DS_Store') !== -1) return;

        var newFilename = fixname(f)
        const fullPath = path.join(dir, f);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory())
        {
            walk(fullPath);
        }
        else
        {
            if(newFilename !== f)
            {
                const fullRenamePath = path.join(dir, newFilename);

                fs.renameSync(fullPath, fullRenamePath)
                console.log('Renamed: ' + fullPath + ' to ' + fullRenamePath)
            }
        }
    });
}



const fixname = function(filename)
{
    const validate = /^[a-z0-9\.\/\-\_]+$/;

    if (!validate.test(filename))
    {
         var newFilename = filename

        return decamelize(newFilename);
    }
    else
    {
        return filename;
    }
}

const inputDir = process.argv[2]//args.path;

if(!inputDir)
{
    console.log('please provide a path')
}
else
{
    walk(inputDir)

    if(count > 0)
    {
        console.log(count + ' files names fixed.')
    }
    else
    {
        console.log('all file names are valid, well done goodboy!')
    }
}