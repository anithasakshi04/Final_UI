import React,{useState} from "react";
import BatchList from "./BatchList";
import BatchDetail from "./BatchDetail";
import "../Layout/paymentapp.css"

export default function BatchMainContent(){
  const [selectedBatch, setSelectedBatch] = useState(null);
  return(
  <div className="content">
  {!selectedBatch ? (
    <BatchList onSelectBatch={setSelectedBatch} />) : (<BatchDetail batchId={selectedBatch} goBack={() => setSelectedBatch(null)} />
  )}
</div>
  );
}
