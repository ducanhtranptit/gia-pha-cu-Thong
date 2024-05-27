import "./style.css";
import { Link } from "react-router-dom";
function UserItem({ data }) {
  return (
    <Link to={`/person-infor/${data.name}`} className="wrapper-user">
      <img
        className="avatar"
        src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/395638231_2063136180709833_2488797073975967954_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEbDXQnlzE521rxyDM1wAxmb6QAL5l9VrNvpAAvmX1Ws_ZK47sKXr4OtRDCwFLuhapxy4ZstHLYqLpqA7WeZ2nV&_nc_ohc=oYfi08dNilgQ7kNvgGJuvo4&_nc_ht=scontent.fhan9-1.fna&oh=00_AYA6ZQjMP9l-XrdPwQ9X1hrkVJaJ7iajzITXuzlxNAF-vQ&oe=6658E651"
        alt="thanh"
      ></img>
      <div className="info">
        <p className="name">{data.name}</p>
      </div>
    </Link>
  );
}

export default UserItem;
