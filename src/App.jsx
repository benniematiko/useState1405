
import './App.css'

import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';


const faqData = [
  { id: 1, question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
  { id: 2, question: "How do I track my order?", answer: "Once shipped, you'll receive an email with a tracking link." },
  { id: 3, question: "Do you offer international shipping?", answer: "Yes, we ship to over 50 countries worldwide." },
  { id: 4, question: "Can I change my order after placing it?", answer: "Orders can be modified within 1 hour of placement." },
  { id: 5, question: "Is my payment information secure?", answer: "We use industry-standard SSL encryption for all transactions." }
];

function App() {

  const [ myName, setMyName] = useState("Ben")
 
  return (
  <div>
     <div><h1>Hello, {myName}!</h1></div>
   <ProductCard />

   <LightSwitch />

   <Accordion />
  </div>
  )
}





const ProductCard = () => {
  const [item, setItem] = useState({ 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 89.99, 
    qty: 1 
  });

  const updateQty = (delta) => {
    setItem(prev => ({...prev,// Clamp the value between 1 and 10
      qty: Math.max(1, Math.min(10, prev.qty + delta))
    }));
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white max-w-md">
      {/* Product Info */}
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
           🎧
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
          <button 
            onClick={() => updateQty(-1)}
            disabled={item.qty <= 1}
            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <span className="w-10 text-center font-medium text-gray-700">
            {item.qty}
          </span>

          <button 
            onClick={() => updateQty(1)}
            disabled={item.qty >= 10}
            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        
        {/* Total Calculation */}
        <p className="text-xs text-gray-400">
          Subtotal: ${(item.price * item.qty).toFixed(2)}
        </p>
      </div>
    </div>
  );
};




function LightSwitch() {
  // 1. Initial state is 'false' (light is off)
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>The light is {isOn ? "ON 💡" : "OFF 🌑"}</p>
      {/* 2. When clicked, we flip the boolean */}
      <button onClick={() => setIsOn(!isOn)}>
        Switch
      </button>
    </div>
  );
}











function Accordion() {
  // activeId holds the ID of the currently expanded item (null means all closed)
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    // If the clicked item is already active, close it. Otherwise, open the new one.
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item) => (
        <div key={item.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '10px' }}>
          <button
            onClick={() => toggleAccordion(item.id)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '15px',
              background: '#f9f9f9',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {item.question}
            <span>{activeId === item.id ? '−' : '+'}</span>
          </button>
          
          {activeId === item.id && (
            <div style={{ padding: '15px', color: '#555', lineHeight: '1.5' }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export default App
