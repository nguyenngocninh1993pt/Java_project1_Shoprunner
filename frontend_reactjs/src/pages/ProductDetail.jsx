import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Truck, ShieldCheck, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productsData.find(p => p.id === id);
  const [quantity,setQuantity] = useState(1);

  if(!product) return <p style={{textAlign:"center", marginTop:"5rem", color:"#aaa"}}>Không tìm thấy sản phẩm.</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      action: { label:"Xem giỏ hàng", onClick:()=>navigate("/cart") }
    });
  };

  const shuffled = productsData.filter(p=>p.id!==product.id).sort(()=>0.5-Math.random()).slice(0,4);
  const advantages = [
    { icon:<Package size={20}/>, text:"Đóng gói cẩn thận" },
    { icon:<Truck size={20}/>, text:"Giao hàng nhanh" },
    { icon:<ShieldCheck size={20}/>, text:"Đảm bảo chất lượng" },
  ];

  const increment = ()=>setQuantity(q=>q+1);
  const decrement = ()=>setQuantity(q=>q>1?q-1:1);

  return (
    <div style={{background:"#000", color:"#fff", minHeight:"100vh", padding:"5rem 6%"}}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"2.5rem",
        maxWidth:"1200px",
        margin:"0 auto"
      }}>
        <div style={{position:"relative"}}>
          <img src={product.image} alt={product.name} style={{
            width:"100%",
            height:"500px",
            objectFit:"cover",
            borderRadius:"1.5rem",
            border:"1px solid #222",
            transition:"transform 0.4s ease"
          }} 
          onMouseEnter={e=> e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e=> e.currentTarget.style.transform="scale(1)"} />
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
          <h1 style={{fontSize:"2.5rem", fontWeight:"800"}}>{product.name}</h1>
          <p style={{fontSize:"1.8rem", fontWeight:"600"}}>{product.price.toLocaleString()} ₫</p>
          <p style={{color:"#aaa"}}>{product.description}</p>

          <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
            <span>Số lượng:</span>
            <div style={{
              display:"flex",
              alignItems:"center",
              background:"#111",
              borderRadius:"999px",
              border:"1px solid #333"
            }}>
              <button onClick={decrement} style={{
                padding:"0.3rem 0.8rem",
                borderRadius:"999px 0 0 999px",
                background:"#111",
                color:"#fff",
                cursor:"pointer"
              }}> <Minus size={16}/> </button>
              <input type="number" min="1" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}
                style={{
                  width:"50px",
                  textAlign:"center",
                  background:"#111",
                  color:"#fff",
                  border:"none",
                  outline:"none"
                }}
              />
              <button onClick={increment} style={{
                padding:"0.3rem 0.8rem",
                borderRadius:"0 999px 999px 0",
                background:"#111",
                color:"#fff",
                cursor:"pointer"
              }}> <Plus size={16}/> </button>
            </div>
          </div>

          <button onClick={handleAddToCart} style={{
            display:"flex",
            alignItems:"center",
            gap:"0.5rem",
            background:"#fff",
            color:"#000",
            padding:"0.8rem 1.6rem",
            borderRadius:"50px",
            fontWeight:"600",
            cursor:"pointer",
            transition:"all 0.3s ease"
          }}
          onMouseEnter={e=> e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e=> e.currentTarget.style.transform="scale(1)"}
          >
            <ShoppingCart size={20}/> Thêm vào giỏ hàng
          </button>

          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginTop:"1rem"}}>
            {advantages.map((adv,idx)=>(
              <div key={idx} style={{
                display:"flex",
                alignItems:"center",
                gap:"0.5rem",
                background:"#111",
                padding:"0.5rem 1rem",
                borderRadius:"1rem",
                cursor:"pointer",
                transition:"all 0.3s ease"
              }}
              onMouseEnter={e=> e.currentTarget.style.background="#222"}
              onMouseLeave={e=> e.currentTarget.style.background="#111"}
              >
                {adv.icon}
                <span style={{color:"#ddd", fontWeight:"500"}}>{adv.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:"5rem", maxWidth:"1200px", marginLeft:"auto", marginRight:"auto"}}>
        <h2 style={{fontSize:"2rem", fontWeight:"700", marginBottom:"1.5rem"}}>Sản phẩm liên quan</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem"}}>
          {shuffled.map(item=>(
            <div key={item.id} 
              style={{
                background:"#111",
                border:"1px solid #222",
                borderRadius:"1rem",
                overflow:"hidden",
                cursor:"pointer",
                transition:"transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onClick={()=>navigate(`/product/${item.id}`)}
              onMouseEnter={e=>{
                e.currentTarget.style.transform="scale(1.03)";
                e.currentTarget.style.boxShadow="0 10px 25px rgba(255,255,255,0.1)";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform="scale(1)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <img src={item.image} alt={item.name} style={{width:"100%", height:"150px", objectFit:"cover"}}/>
              <div style={{padding:"0.5rem", textAlign:"center"}}>
                <h3 style={{fontSize:"0.9rem", fontWeight:"600"}}>{item.name}</h3>
                <p style={{color:"#aaa", fontSize:"0.75rem"}}>{item.category}</p>
                <p style={{fontWeight:"700", fontSize:"0.9rem", marginTop:"0.25rem"}}>{item.price.toLocaleString()} ₫</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
