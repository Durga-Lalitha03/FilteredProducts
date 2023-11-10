const fs = require('fs');
const productsString = fs.readFileSync(
    "./wmreplica20231018.products.json",
    "utf-8"
  );
  const products = fs.readFileSync(
    "./orders_address_not_found_log.data.json",
    "utf-8"
  );
  const productsString1=JSON.parse(productsString)
  const products1=JSON.parse(products)

  console.log("xc")
  let products_Data=[]
  Object.entries(products1).map(e=>{

    let d=productsString1.filter((entry,index)=>{

        if(entry._id.$oid==e[1]._id){
          let x=null ??entry.ordering_option
          let ordering_option={}
          if(x!=null)
          {
             ordering_option=x.filter(option=>{
              return option.orderunit==e[1].invalidVariants.priceunit
            })
          }  
        products_Data=[... products_Data,
            { 
              _id:e[1]._id, 
              product_name:entry.product_name,
              invalidVariants:{...e[1].invalidVariants,...(ordering_option.length > 0 && ordering_option[0]),}
            
          }]


        }
    })
 })
//  console.log(products_Data)
 fs.writeFileSync(
  "orders_address_not_found_unit_log.data.json",
  JSON.stringify(products_Data)
);
