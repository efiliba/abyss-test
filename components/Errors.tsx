interface Props {
  errors: string[];
}

export const Errors = ({ errors }: Props) =>
  <>
    <ul>
      {errors.map((error, index) => <li key={index}>{error}</li>)}
    </ul>

    <style jsx>{`
      ul {
        padding-left: 2rem;
        color: red;
      }
    `}</style>
  </>;
