import { ErrorBoundary } from "components/pages/ErrorBoundary";
import AppsLoader from "components/system/Apps/AppsLoader";
import Desktop from "components/system/Desktop";
import Taskbar from "components/system/Taskbar";
import useGlobalKeyboardShortcuts from "hooks/useGlobalKeyboardShortcuts";
import useIFrameFocuser from "hooks/useIFrameFocuser";
import useUrlLoader from "hooks/useUrlLoader";
import { useEffect } from "react";
import { lockTitle } from "utils/functions";

const Index = (): React.ReactElement => {
  useIFrameFocuser();
  useUrlLoader();
  useGlobalKeyboardShortcuts();

  useEffect(() => {
    lockTitle();
  }, []);

  return (
    <ErrorBoundary>
      <Desktop>
        <Taskbar />
        <AppsLoader />
      </Desktop>
    </ErrorBoundary>
  );
};

export default Index;
