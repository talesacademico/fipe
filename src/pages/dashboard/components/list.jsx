import Table from 'react-bootstrap/Table';

export function List({data}) {
    return (
        <Table striped>
          <tbody>
            {data.map((element, index) => {
            return(<tr key={index}>
              <td>{element.label}</td>
              <td>{element.value}</td>
            </tr>)
            })}
          </tbody>
        </Table>
      );
}