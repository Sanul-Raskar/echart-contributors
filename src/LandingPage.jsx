import { useQuery } from "react-query";
import {array} from 'prop-types'

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

const RecursiveComponent = ({Section}) => {
  return (
    <div style={{ paddingLeft: "20px" }}>
      {Section.map((parent) => {
        return (
          <div key={parent.TOCHeading}>
            <span>{parent.TOCHeading}</span>
            {/* Base Condition and Rendering recursive component from inside itself */}
            <div>
              {parent.Section && <RecursiveComponent Section={parent.Section} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

RecursiveComponent.propTypes = {
  Section: array
}

/* const getTitle = (array=[], current ={}) => {

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
  
} */

export const LandingPage = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: "fetchList",
    queryFn: fetchData,
  });

  //console.warn(data.map((obj) => getTitle(obj)))

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      <RecursiveComponent Section={data}/>
    </div>
  );
};
