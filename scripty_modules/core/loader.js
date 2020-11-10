function loader(path, callback) {
    const { File, Directory } = clr.System.IO;
    
    const readdir = target => {
        Directory.GetFiles(target).forEach(fileName => callback(fileName));
        Directory.GetDirectories(target).forEach(dirName => readdir(dirName));
    }

    if(File.Exists(path)) {
        callback(path);
    } else if(Directory.Exists(path)) {
        readdir(path);
    } else {
        alert(`${path} is not a valid file or directory.`);
    }
}