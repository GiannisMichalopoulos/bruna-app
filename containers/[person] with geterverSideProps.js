import { useRouter } from "next/router";

const Person = (props) => {
  // const router = useRouter();
  // console.log(props.ownersList[0]);

  return (
    <h2>
      {props.ownersList[0].ownerName}'s {props.ownersList[0].vehicle}
      <br />
      {props.ownersList[0].details}
    </h2>
  );
  //<pre>{JSON.stringify(props, null, 4)}</pre>;
  // <pre>{JSON.stringify(ownersList[0].details, null, 4)}</pre>;
};
export default Person;

export const getServerSideProps = async (ctx) => {
  console.log(ctx.req);
  if (!ctx.req) {
    return { ownersList: [] };
  }
  const query = ctx.query;
  // console.log(ctx);
  const response = await fetch(
    "http://localhost:4001/vehicles?ownerName=" +
      query.person +
      "&vehicle=" +
      query.vehicle
  );
  const ownersList = await response.json();
  return { props: { ownersList } };
};
