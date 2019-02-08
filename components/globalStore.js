import {
    observable,action,autorun, toJS
} from 'mobx';

class Store {
    @observable basketOrBottomNav = false;
    @observable products = {count: 0,productsAdded : []};
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
    @observable clone = [];
    removeProduct(name){
        for (let i = 0; i < this.clone.length; i++) {
            if(this.clone[i].name == name){
                console.log("Bu isim siliniyor" + name);
                this.clone.splice(i,1);
            }
            
        }
        
    }
    @action addProductToBasket(productToAdd){
        
        this.counter = this.counter + 1;
        console.log("Sayıyor amk kodum cocugu " + this.counter);
        this.products.productsAdded.push(productToAdd);
        this.clone = toJS(this.products.productsAdded);
        
        console.log("Clone u bastırdım" + JSON.stringify(this.clone));
        this.productToAdd = {_id: '', name: '', imageUrl: '', price: 0.0 , finalPrice: 0.0, quantity: 1 };
    }
    changeBetweenBasketOrBottomNav(){
        if(this.basketOrBottomNav){
            this.basketOrBottomNav = false;
        }
        else{
            this.basketOrBottomNav = true;
        }
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