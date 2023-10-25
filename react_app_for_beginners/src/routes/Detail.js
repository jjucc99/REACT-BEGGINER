import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const printDetail = (detail) => {
  return (
    <div>
      <img src={detail.medium_cover_image} alt={detail.title}></img>
      <h1>{detail.title}</h1>
      <p>{detail.date_uploaded}</p>
      <a href={detail.url}>{detail.url}</a>
      <hr />
      <div>
        <p>{detail.description_full}</p>
      </div>
      <hr />
      <ul>
        {detail.genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
};

function GetDetail() {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getDetail = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
  };
  useEffect(() => {
    getDetail();
  }, []);
  return detail;
}

function Detail() {
  const detail = GetDetail();
  console.log(detail);
  return <h1>{printDetail(detail)}</h1>;
}
export default Detail;
