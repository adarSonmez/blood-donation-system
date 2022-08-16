export type BloodType =
  | 'A'
  | 'B'
  | 'AB'
  | 'O'
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'

function BloodTypesTable({ orders, types }: any) {
  return (
    <table className="blood-types-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>
            Units
            <br />
            (0.5L)
          </th>
        </tr>
      </thead>
      <tbody>
        {types.map(({ blood_type, num_of_blood }: any) => (
          <tr key={blood_type}>
            <td>{blood_type}</td>
            <td>{num_of_blood}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BloodTypesTable
