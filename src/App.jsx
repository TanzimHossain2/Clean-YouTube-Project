import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./layouts/Layout";
import Routers from "./routes/Router";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routers />
      </Layout>
    </>
  );
};

export default App;
