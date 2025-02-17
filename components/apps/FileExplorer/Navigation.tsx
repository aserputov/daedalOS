import AddressBar from "components/apps/FileExplorer/AddressBar";
import {
  Back,
  Down,
  Forward,
  Up,
} from "components/apps/FileExplorer/NavigationIcons";
import SearchBar from "components/apps/FileExplorer/SearchBar";
import StyledNavigation from "components/apps/FileExplorer/StyledNavigation";
import { useMenu } from "contexts/menu";
import { useProcesses } from "contexts/process";
import useHistory from "hooks/useHistory";
import { basename, dirname } from "path";
import { useCallback } from "react";
import Button from "styles/common/Button";
import { ROOT_NAME } from "utils/constants";
import { label } from "utils/functions";

type NavigationProps = {
  hideSearch: boolean;
  id: string;
};

const Navigation: FC<NavigationProps> = ({ hideSearch, id }) => {
  const {
    url: changeUrl,
    processes: {
      [id]: { url = "" },
    },
  } = useProcesses();
  const upTo = url !== "/" ? basename(dirname(url)) : undefined;
  const { contextMenu } = useMenu();
  const { canGoBack, canGoForward, history, moveHistory, position } =
    useHistory(url, id);
  const getItems = useCallback(
    () =>
      history.map((historyUrl, index) => ({
        action: () => moveHistory(index - position),
        checked: position === index,
        label: basename(historyUrl) || ROOT_NAME,
        primary: position === index,
      })),
    [history, moveHistory, position]
  );

  return (
    <StyledNavigation>
      <Button
        disabled={!canGoBack}
        onClick={() => moveHistory(-1)}
        {...label(
          canGoBack
            ? `Back to ${basename(history[position - 1]) || ROOT_NAME}`
            : "Back"
        )}
      >
        <Back />
      </Button>
      <Button
        disabled={!canGoForward}
        onClick={() => moveHistory(+1)}
        {...label(
          canGoForward
            ? `Forward to ${basename(history[position + 1]) || ROOT_NAME}`
            : "Forward"
        )}
      >
        <Forward />
      </Button>
      <Button
        disabled={history.length === 1}
        onClick={contextMenu?.(getItems).onContextMenuCapture}
        {...label("Recent locations")}
      >
        <Down />
      </Button>
      <Button
        disabled={url === "/"}
        onClick={() => changeUrl(id, dirname(url))}
        {...label(
          url === "/"
            ? "Up one level"
            : `Up to "${upTo === "" ? ROOT_NAME : upTo}"`
        )}
      >
        <Up />
      </Button>
      <AddressBar id={id} />
      {!hideSearch && <SearchBar id={id} />}
    </StyledNavigation>
  );
};

export default Navigation;
