import { useQuery } from "react-query";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/1983/JSON/"
    );

    const data = await response.json();

    return data?.Record?.Section;
  } catch (error) {
    console.error(error);
  }
};

const getTitle = (array=[], current ={}) => {

 if(current?.TOCHeading){
  console.warn(current?.TOCHeading)
 }

  if(!current.Section){

    console.warn("last element",
    current.TOCHeading)
    return <p>{current.TOCHeading}</p>
  }

  current.Section.forEach(({Section}) => {
    getTitle(Section);
});
  
}

export const LandingPage = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: "fetchList",
    queryFn: fetchData,
  });

  console.warn(data.map((obj) => getTitle(obj)))

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      
    </div>
  );
};
