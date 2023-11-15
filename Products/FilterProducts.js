const fs = require('fs');
const productsString = fs.readFileSync(
    "./wmreplica20231018.products.json",
    "utf-8"
  );
  const products = fs.readFileSync(
    "./invalid_variants_log.data.json",
    "utf-8"
  );
  const productsStringJson=JSON.parse(productsString)
  const productsJson=JSON.parse(products)
  let products_Data=[]
  Object.entries(productsJson).map(entry=>{

    const product_id=entry[0]
    let data=productsStringJson.filter((each,index)=>{
        return each._id.$oid==entry[0]
    })


    let x=null ??data[0].ordering_option
    if(x!=null){
    let data1=entry[1].invalidVariants.map(item=>{
        for(let index=0;index<data[0].ordering_option.length;index++){
        
            if(item.priceunit===data[0].ordering_option[index].orderunit)
                item={...item,...data[0].ordering_option[index]}
        }
        return item
    })
    // console.log(d)
    console.log("klknkjnj")
    products_Data=[...products_Data,{
                                    product_id,
                                    invalidVariants:data1.map((option,ind)=>(option)).flat()
                                }]
    }
    else
    {
        products_Data=[...products_Data,{
                                            product_id,
                                            invalidVaraints:entry[1].invalidVariants
                                        }]
    }
    // console.log(products_Data)
  })
  fs.writeFileSync(
    "invalid_variants.data.json",
    JSON.stringify(products_Data)
  );