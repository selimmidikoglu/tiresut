import {
    observable,
} from 'mobx';

class Store {
    @observable products = [];
    @observable latitude = 0.0;
    @observable longitute = 0.0;
    @observable text = 'Bos';
    @observable text2 = 'Bos';
    @observable name = '';
    @observable phone_number = '';
    @observable password = '';
    @observable page = 'home'

    cahangePage(text){
        this.page = text;
    }

    changeText(value){
        this.text2 = this.text
        this.text = value;
    }
    changeCoordinates(lat,lon){
        this.latitude = lat;
        this.longitute = lon;
        console.log(this.latitude + " Hyadar " + this.longitute)
    }
    changeFirstProductPrice(price){
        this.urunler.urun1.fiyat = 50;
    }
}


const storePublish = new Store();
export default storePublish;