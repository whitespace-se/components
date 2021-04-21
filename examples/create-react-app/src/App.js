import { Button, Icon, Link, IconProvider } from "@whitespace/components";
import arrowIcon from "./icons/arrow.svg";

function App() {
  return (
    <IconProvider icons={{ arrow: arrowIcon }}>
      <div className="App">
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
  );
}

export default App;