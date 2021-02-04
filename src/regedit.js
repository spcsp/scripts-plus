class Regedit {
  readKey(root, path, key) {
    return sp.RegistryReadString(root, path, key, true);
  }

  get readers() {
    const CurrentUser = (...pathToKey) => {
      const keyName = pathToKey.pop();

      return this.readKey(
        Registry.CurrentUser,
        pathToKey.join("\\"),
        keyName,
        true
      );
    };

    return { CurrentUser };
  }
}

module.exports = new Regedit();
