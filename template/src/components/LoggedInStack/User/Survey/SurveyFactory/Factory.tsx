import FactoryMapper from './FactoryMapper';
class Factory {
    constructor() {
        this.factoryMapper = new FactoryMapper();
    }

    create(item, handleAnswer) {
        const {type} = item;

        // console.tron.log(item);

        if (type) {
            const factory = this.factoryMapper.factory(type.toLowerCase());
            return factory?.create({item, handleAnswer});
        }
    }
}

export default Factory;
