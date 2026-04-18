import { Button } from "@/lib/components/elements/butttons";
import { Text } from "@/lib/components/elements/text";

const NotFoundPage = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridAutoRows: "auto",
        justifyItems: "center",
        alignContent: "center",
        gap: "2rem",
        color: "var(--fg-s)",
      }}
    >
      <Text<"h1"> as="h1" style={{ fontSize: "3.6rem" }}>{"404 - Not Found."}</Text>
      <Button<"a"> as="a" variant="outlined" href="/">{"Go Home"}</Button>
    </main>
  );
};

export default NotFoundPage;
