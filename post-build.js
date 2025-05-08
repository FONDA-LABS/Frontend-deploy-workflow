import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace paths for src and href to be relative
    content = content.replace(/href=\"\//g, 'href="./');
    content = content.replace(/src=\"\//g, 'src="./');
    content = content.replace(/srcset=\"\//g, 'srcset="./');
    content = content.replace(/poster=\"\//g, 'poster="./');

    // Add .html to <a> tags where href doesn't end with .html
    content = content.replace(/href="([^"#?]*)(?=")/g, (match, p1) => {
        if (
            !p1.startsWith('tel:') &&
            !p1.startsWith('mailto:') &&
            !p1.startsWith('javascript:') &&
            !p1.endsWith('.html') &&
            !p1.endsWith('.css') &&
            !p1.endsWith('.png') &&
            !p1.endsWith('.jpeg') &&
            !p1.endsWith('.jpg') &&
            !p1.endsWith('.webp') &&
            !p1.endsWith('/') &&
            !p1.endsWith('#')) {
            return `href="${p1}.html`;
        }
        return match;
    });

    // replace all ../media/ with ./assets/
    content = content.replace(/\.\.\/media\//g, './assets/');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function replaceInAssetsPathInCss(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // replace all /assets/ with ./
    content = content.replace(/\/assets\//g, './');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function copyFolderRecursiveSync(source, target) {
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach(function (file) {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                fs.copyFileSync(curSource, path.join(targetFolder, file));
            }
        });
    }
}

const distPath = path.join(process.cwd(), 'dist');
const srcPath = path.join(process.cwd(), 'src');
const mediaPath = path.join(srcPath, 'media');
const assetsPath = path.join(distPath, 'assets');

fs.readdirSync(distPath).forEach(file => {
    if (file.endsWith('.html')) {
        replaceInFile(path.join(distPath, file));
    }
});

fs.readdirSync(assetsPath).forEach(file => {
    if (file.endsWith('index.css')) {
        replaceInAssetsPathInCss(path.join(assetsPath, file));
    }
});

copyFolderRecursiveSync(mediaPath, distPath);
