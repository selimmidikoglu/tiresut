import {
    observable,
} from 'mobx';

class Store {
    @observable products = [];
    @observable counter = 0;
    @observable latitude = 0.0;
    @observable longitute = 0.0;
    @observable text = 'Bos';
    @observable text2 = 'Bos';
    @observable name = '';
    @observable phone_number = '';
    @observable password = '';
    @observable page = 'home'
    @observable productToAdd = {_id: '', name: '', imageUrl: '', price: 0.0 , finalPrice: 0.0, quantity: 1 }
    cahangePage(text){
        this.page = text;
    }
    addProductToBasket(productToAdd){
        this.products[this.counter] = productToAdd;
        console.log(productToAdd);
        this.counter = this.counter + 1;
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
    changeThePriceWithQuantity(){
        this.productToAdd.finalPrice = this.productToAdd.price * this.productToAdd.quantity;
    }
    incrementQuantity(){
        if(this.productToAdd.quantity>=1){
            this.productToAdd.quantity = this.productToAdd.quantity + 1;
            this.changeThePriceWithQuantity();
        }else{
            this.productToAdd.quantity = 1
        }
        
    }
    decrementQuantity(){
        if(this.productToAdd.quantity>1){
            this.productToAdd.quantity = this.productToAdd.quantity - 1;
            this.changeThePriceWithQuantity();
        }else{
            this.productToAdd.quantity = 1
        }
    }
    changeTheChosenProduct(text){
        this.productToAdd.name = text;
    }
    

}


const storePublish = new Store();
export default storePublish;