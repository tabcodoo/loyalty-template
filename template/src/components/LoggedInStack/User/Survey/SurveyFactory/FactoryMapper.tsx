// import UsernameFactory from './UsernameFactory';
// import PasswordFactory from './PasswordFactory';
// import CheckBoxFactory from './CheckBoxFactory';
// import ImageUploadFactory from './ImageUploadFactory';
// import DropdownFactory from './DropdownFactory';
// import TextInputFactory from './TextInputFactory';
import MultipleFactory from './Multiple';
import SingleFactory from './Single';
import DateFactory from './Date';

class FactoryMapper {
    constructor() {
        // const usernameFactory = new UsernameFactory();
        // const passwordFactory = new PasswordFactory();
        // const checkBoxFactory = new CheckBoxFactory();
        // const imageUploadFactory = new ImageUploadFactory();
        // const dropdownFactory = new DropdownFactory();
        // const textInputFactory = new TextInputFactory();
        const multiple = new MultipleFactory();
        const single = new SingleFactory();
        const date = new DateFactory();

        this.factories = {};
        this.factories[multiple.type] = multiple;
        this.factories[single.type] = single;
        this.factories[date.type] = date;
        // this.factories[passwordFactory.type] = passwordFactory;
        // this.factories[checkBoxFactory.type] = checkBoxFactory;
        // this.factories[checkBoxFactory.secondaryType] = checkBoxFactory;
        // this.factories[imageUploadFactory.type] = imageUploadFactory;
        // this.factories[dropdownFactory.type] = dropdownFactory;
        // this.factories[textInputFactory.type] = textInputFactory;
    }

    factory = (type) => {
        return type && this.factories[type];
    };
}

export default FactoryMapper;
