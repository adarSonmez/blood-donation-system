function TopTensTable({ url, data }) {
  return (
    <table className="top-tens-table">
      <caption>Top {url}</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>{data ? data[0].unit : ''}</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, num }, i) => (
          <tr key={id}>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{num}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TopTensTable;
