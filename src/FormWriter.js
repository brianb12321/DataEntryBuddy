export class FormWriter {
    writeFunction;
    friendlyName;
    name;

    constructor(name, friendlyName, writeFunction) {
        this.name = name;
        this.friendlyName = friendlyName;
        this.writeFunction = writeFunction;
    }
}