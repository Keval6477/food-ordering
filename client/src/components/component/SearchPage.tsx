import { useParams } from "react-router-dom";

const SearchPage = () => {
    const {text} = useParams();
    alert(text);
  return <div>SearchPage</div>;
};

export default SearchPage;
