import React, { useState, useEffect, useCallback } from "react";
import invoiceStyles from "./invoice.module.css";
import InvoiceHeader from "../header/header";
import Edit from "../edit/Edit";
const Invoice = () => {

  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [editType,setEditType]=useState('')

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetch("/invoice.json");
      const response = await data.json();
      setInvoiceData(response);
      setIsLoading(false);
    } catch (ex) {
      if (ex instanceof Error) {
        if (ex.message) {
          setError(ex.message);
        }
      }
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateSum = () => {
  let sum=0;
  invoiceData.lineItems?.forEach(item=>{
    return sum+=item.price
  })
  return sum.toFixed(2)
  };

  const onEdit = (id,type) => {
    setSelectedId(id);
    setEditType(type)
  };

  const onCancel=()=>{
    setEditType('');
    setSelectedId(-1)
  }

  const onChange=()=>{
    // handle implementation
  }


  const onDrop=(e) => {
    e.preventDefault();
    var reader = new FileReader(); // File reader to read the file 
        
    if(e.dataTransfer.files[0].type!=='application/json'){
      window.alert('Only Json files allowed')
    }
    reader.addEventListener('load', function() {
      var result = JSON.parse(reader.result); // Parse the result into an object
      setInvoiceData(result)
    })
    reader.readAsText(e.dataTransfer.files[0])
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
}

  if (isLoading) {
    return <label>Loading...</label>;
  }
  if (!isLoading && !error && !invoiceData) {
    return <label>No Data found</label>;
  }
  return (
    <>
      <InvoiceHeader data={invoiceData} />
        <table>
          <thead>
            <tr>
            <th>
              <label>Item</label>
            </th>
            <th>
              <label>Price</label>
            </th>
            </tr>
          </thead>
          <tbody>
          {invoiceData &&
            invoiceData?.lineItems.map((item, index) => {
              return (
                <tr key={item.description}>
                  <th>
                    <span onClick={() => onEdit(index,'description')}>Edit</span>
                    {index === selectedId && editType==='description' && <Edit key={item.description} onCancel={onCancel}/>}
                    {index !== selectedId &&  item.description}
                    {index === selectedId && editType!=='description' && item.description}
                  </th>
                  <th>
                  <span onClick={() => onEdit(index,'price')}>Edit</span>
                    {index === selectedId && editType==='price' && <Edit key={item.description} onCancel={onCancel} onChange={onChange}/>}
                    {index !== selectedId &&  item.price}
                    {index === selectedId && editType!=='price' &&  item.price}
                  </th>
                </tr>
              );
            })}
            <tr>
          <th />
          <th>
            <div className={invoiceStyles.divider} />
          </th>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th>
              <label>Total</label>
            </th>

            <th>
              <label>{calculateSum()} EUR</label>
            </th>
            <th />
          </tr>
          </tfoot>
        </table>

      <div className={invoiceStyles.dropZone} draggable  onDragOver={onDragOver} onDrop={onDrop}>
        <label>Drag and drop files here</label>
      </div>
    </>
  );
};

export default Invoice;
