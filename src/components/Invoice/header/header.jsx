import headerStyles from "./header.module.css";
const InvoiceHeader = ({ data }) => {
  const { createdAt, dueAt, fullName, email, company } = data;
  return (
    <>
      <div className={headerStyles.container}>
        <div className={headerStyles.container__img} />
        <div className={headerStyles.container__detailsContainer}>
          <table>
            <tr>
              <th>Created</th>
              <th>{createdAt}</th>
            </tr>
            <tr>
              <th>Due</th>
              <th>{dueAt}</th>
            </tr>
          </table>
        </div>
      </div>
      <div className={headerStyles.container__receipientDetails}>
        <label>{fullName}</label>
        <label>{email}</label>
        <label>{company}</label>
      </div>
    </>
  );
};

export default InvoiceHeader;
