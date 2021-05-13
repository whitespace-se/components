import {
  Breadcrumbs,
  Button,
  Icon,
  Link,
  IconProvider,
  ThemeProvider,
} from "@whitespace/components";
import arrowIcon from "./icons/arrow.svg";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IconProvider icons={{ arrow: arrowIcon }}>
        <div className="App">
          <Breadcrumbs
            items={[
              { label: "Home", url: "/" },
              { label: "Sample page", url: "/" },
            ]}
          />
          <p>
            <Button href="#">
              <Icon src={arrowIcon} /> Button
            </Button>
          </p>
          <p>
            <Link href="#">
              <Icon name="arrow" /> Link
            </Link>
          </p>
        </div>
      </IconProvider>
    </ThemeProvider>
  );
}

export default App;
