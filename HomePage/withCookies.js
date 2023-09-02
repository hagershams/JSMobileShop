// export 
let Item =[];
//Footer Newsletter Input
function ToContactPage(event){
    console.log(event);
    if(event.target.baseURI == "http://127.0.0.1:5500/ContactUs/index.html#") location.href='#fullName'
    else location.assign('http://127.0.0.1:5500/ContactUs/index.html#')
}

function DotMove(event){
    if(event.target) var dot = event.target.id
    else var dot = event
    var slide = document.getElementById('Slider_Image')
    slide.setAttribute('src',`./Slider/slider${dot}.jpg`)
}

function SliderMove(event){
    var slider = event.target.id
    var image = document.getElementById('Slider_Image')
    var src = image.getAttribute('src')
    var n = SplitPath(src)
    n = Number(n)
    if(slider == 'Prev'){
        if(n==1) n=3
        else n=n-1
    }
    else{
        if(n==3) n=1
        else n = n+1
    }
    DotMove(n)
}

function SplitPath(path){
    var n = path.split('slider')[1]
    n = n.split('.')[0]
    return n;
}

function swap(id1,id2,id3){
    let btn1 = document.getElementById(id1)
    let btn2 = document.getElementById(id2)
    let btn3 = document.getElementById(id3)
    btn1.classList.remove('active')
    btn2.classList.remove('active')
    btn3.classList.add('active')

}

function ReadData(key,Folder,Id){
    let Data;
    let Items;
    fetch("./Data.json").then((res)=>{
        return res.json()
    })
    .then((data)=>{
        Data=data
        Items = Data[key]
        if(Id) {
            let item = Items.find(ele=> ele.id == Id)
            Item.push([item])
        }
        else DiplayImages(Items,Folder)
    })
}

function DiplayImages(DataItems,Folder){
    let imgElements = document.querySelectorAll('img')
    console.log(imgElements);
    let [,...ImagesCont] = imgElements
    console.log('Number of IMG Tags in all Html File-1 should=6 ---- ',ImagesCont);
    
    let n =1
    for(var i=0; i<6; i++){
        //Changing Image and its size
        ImagesCont[i].classList.remove('original')
        ImagesCont[i].classList.add('imgInCard')
        let path = `./${Folder}/${n}.jpg`
        ImagesCont[i].setAttribute('src',`${path}`) //image
        ImagesCont[i].style.display='block'

        // converting the div container to a card
        let div = document.getElementById(`cont${n}`)
        div.classList.remove('cont')
        div.classList.add('card')



        //Showing the div to have the desc-price-btn
        let content = document.getElementById(`CardContent${n}`)
        content.style.display='block'


        //Filing the data into tags
        let desc = document.getElementsByClassName(`desc${n}`)[0]
        let price = document.getElementsByClassName(`price${n}`)[0]
        desc.innerHTML = `${DataItems[i].description}`
        price.innerHTML = `${DataItems[i].price}`
        //Add Class=image id to the link
        let  a= document.getElementsByClassName(`link${n}`)[0]
        a.classList.add(`${n}`)
        a.classList.add(`${Folder}`)
        //moving to the next data item ... next element
        n++
    }
}

//for buttons click -----> changing btn style       Get Data       display it 
function DisplayIphones(){
    swap('iphone','mac','accessory')
    ReadData(0,'iphone')
}
function DisplayMac(){
    swap('mac','accessory','iphone')
    ReadData(1,'mac')
}
function DisplayAccessories(){
    swap('accessory','iphone','mac')
    ReadData(2,'accessory')

}


function get_folder_name(Mytarget){
    let key = Mytarget.srcElement.children[0].classList[2]
    console.log(key);
    return key;
}
function get_product_id(Mytarget){
    let key = Mytarget.srcElement.children[0].classList[1]
    console.log(key);
    return key;
}


let cookieNum = 1;
function AddToCart(event){
    console.log(event);
    let Folder = get_folder_name(event)
    let Id = get_product_id(event)

    let key;
    if(Folder =='iphone') key = 0
    else if(Folder =='mac') key = 1
    else if(Folder =='iphone') key = 2

    ReadData(key,Folder,Id)

    
    // //Assign Cookies
    // this.document.cookie = `Category${cookieNum} = ${category};`
    // this.document.cookie = `Id${cookieNum} = ${Id};`
    // console.log(this.document.cookie);
    // cookieNum++

    let cart = alert('Added To Cart Successfully!\nPress Ok To See The Cart')
    if (!cart){
        //Move to the Next Page and To Get Data From Cookies
        window.open("http://127.0.0.1:5500/Cart/index.html");
        // location("http://127.0.0.1:5500/Cart/index.html").cookie = this.document.cookie
        // this.location.assign("http://127.0.0.1:5500/Cart/index.html")
    }
}

exports = {Item};









/*  At Cart.js   */

// let CartItems = []


//Fetch Cookies and Push it to an array
// function RetriveCookies(){
//     console.log('lllllllllllll');
//     //Retrive Data from cookies
//     var AllCookies = this.document.cookie
//     AllCookies=AllCookies.split(';')
//     let cookieNum=1;
//     //Spliting Cookies to have values
//     for(var i=0; i<AllCookies.length; i+2){
//         //Getting Category //Folder Name
//         let Category,Id;
//         if(AllCookies[i].includes(`Category${cookieNum}`)){
//             Category = AllCookies[i]
//             Category = Category.split('=')[1]
//         }
//         //Getting Product id
//         if(AllCookies[i+1].includes(`Id${cookieNum}`)){
//             Id = AllCookies[i]
//             Id = Category.split('=')[1]
//             Id = Number(Id)
//         }
//         CartItems.push([Category,Id])
//         cookieNum++
//     }
//     console.log('ooooooooooooo');

// }
