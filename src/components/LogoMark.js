export default function LogoMark() {
  return (
    <img
      className="logo-mark"
      src={`${process.env.PUBLIC_URL}/logo.svg`}
      alt=""
      width="32"
      height="32"
      aria-hidden="true"
    />
  );
}
