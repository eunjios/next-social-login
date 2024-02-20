import Navigation from './Navigation';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
