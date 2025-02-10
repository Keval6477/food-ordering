import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div>
        <Button  className="bg-orange"onClick={() => alert("111")}>Click me</Button>
      </div>
    </>
  );
}

export default App;
