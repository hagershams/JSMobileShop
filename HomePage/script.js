let CartItems =[];
let key;

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

/*                  For Sharing                     */
function ReadData(key,Folder,Id){
    let Data;
    let Items;
    fetch("./Data.json").then((res)=>{
        return res.json()
    })
    .then((data)=>{
        Data=data
        Items = Data[key]
        console.log(Items);
        if(Id) {
            let item = Items.find(ele=> ele.id == Id)
            console.log(item);
            SaveToLocalStorage(item,Folder)
        }
        else DiplayImages(Items,Folder)
    })
}

/*                  For Cart                     */
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
function AddToCart(event){
    let Folder = get_folder_name(event)
    let Id = get_product_id(event)

    if(Folder =='iphone') key = 0
    else if(Folder =='mac') key = 1
    else if(Folder =='iphone') key = 2

    ReadData(key,Folder,Id)
    alert('Added To Cart Successfully!')
}


let num = 1 //Count on Cart
function DisplayAllCart(){
    let content = document.getElementById('Content')
    let div;
    if(localStorage.length == 0){
        div = document.createElement('div')
        div.setAttribute('class','product')
        div.classList.add(`p${num}`)
        div.innerHTML = 'No Items in Cart'
    }
    else{
        for (let i = 1; i <30; i++) {
            if(localStorage.getItem(`Folder${i}`)){
                //Append a div (for each prod) to html content
                div = document.createElement('div')
                div.setAttribute('class','product')
                div.classList.add(`p${num}`)
        
                let Folder =localStorage.getItem(`Folder${i}`)
                let description = localStorage.getItem(`description${i}`)
                let image = localStorage.getItem(`image${i}`)
                image= image.split('./',)[1]
                let price = localStorage.getItem(`price${i}`)
                



                // Filling the Content of each div
                //Div for Image
                let ImgDiv = document.createElement('div')
                ImgDiv.setAttribute('class','ImgDiv')
                let Image = document.createElement('img')
                let path = `../HomePage/${Folder+'/'+image}`
                Image.setAttribute('src',path)
                Image.setAttribute('class','pImage')
                ImgDiv.appendChild(Image)
                console.log(Image);
                console.log(Image.getAttribute('src'));
                div.appendChild(ImgDiv)

                //Div for Text
                let TextDiv = document.createElement('div')
                TextDiv.setAttribute('class','TextDiv')

                let Text1 = document.createElement('p')
                Text1.innerHTML=`${description}`
                TextDiv.appendChild(Text1)

                let Text2 = document.createElement('p')
                Text2.innerHTML=`${price}`
                TextDiv.appendChild(Text2)
                div.appendChild(TextDiv)
                content.append(div)
            }
            else break;
        }
    }
}

let numm = 1 //Count on Cart
function SaveToLocalStorage(item,Folder){
    localStorage.setItem(`Folder${numm}`,Folder)
    localStorage.setItem(`description${numm}`,item.description)
    localStorage.setItem(`image${numm}`,item.image)
    localStorage.setItem(`price${numm}`,item.price)
    numm++
}