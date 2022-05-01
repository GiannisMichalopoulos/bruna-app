import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Person = ({ ownersList }) => {
  const router = useRouter();
  //  console.log(props.ownersList[0]);

  const [owners, setOwners] = useState(ownersList);
  console.log("ownersList length: " + ownersList.length);
  // setOwners(ownersList);
  useEffect(() => {
    async function loadData() {
      console.log("in loadData");
      const response = await fetch(
        "http://localhost:4001/vehicles?ownerName=" +
          router.query.person +
          "&vehicle=" +
          router.query.vehicle
      );
      const ownersList = await response.json();
      setOwners(ownersList);
    }
    if (ownersList.length == 0) {
      loadData();
    }
  }, []);

  if (!owners[0]) {
    return <div>Loading</div>;
  }

  return (
    <h2>
      {owners[0]?.ownerName}'s {owners[0]?.vehicle}
      <br />
      {owners[0]?.details}
    </h2>
  );
  //<pre>{JSON.stringify(props, null, 4)}</pre>;
  // <pre>{JSON.stringify(ownersList[0].details, null, 4)}</pre>;
};
export default Person;

Person.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return { ownersList: [] };
  }
  const query = ctx.query;
  const response = await fetch(
    "http://localhost:4001/vehicles?ownerName=" +
      query.person +
      "&vehicle=" +
      query.vehicle
  );
  const ownersList = await response.json();
  return { ownersList: ownersList };
};
