import {
    observable,
} from 'mobx';

class Store {
    @observable text = 'Bos';
    @observable text2 = 'Bos';
    @observable name = '';
    @observable phone_number = '';
    @observable password = '';
    
    @observable urunler = {
        urun1: {
            fiyat: 10
        },
        urun2: {
            fiyat: 20
        }
    };


    changeText(value){
        this.text2 = this.text
        this.text = value;
    }

    changeFirstProductPrice(price){
        this.urunler.urun1.fiyat = 50;
    }
}


const storePublish = new Store();
export default storePublish;