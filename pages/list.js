import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:4001/vehicles");
  const ownersList = await response.json();
  return { props: { ownersList } };
};

const List = ({ ownersList }) => {
  // const [owners, setOwners] = useState([]);
  // console.log(ownersList);
  // setOwners(ownersList);
  /*useEffect(() => {
    async function loadData() {
      const response = await fetch("http://localhost:4001/vehicles");
      const ownersList = await response.json();
      setOwners(ownersList);
    }

    loadData();
  }, []);*/

  return (
    <div>
      {ownersList.map((e) => (
        <div>
          <Link href={`/${e.vehicle}/${e.ownerName}`}>
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
