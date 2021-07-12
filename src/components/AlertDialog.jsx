import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AlertDialogContext } from "../contexts/Contexts";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { colors } from "../helpers/constants";

export default function AlertDialog() {
  const { alertDialog, setAlertDialog } = useContext(AlertDialogContext);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog
          visible={alertDialog.open}
          onDismiss={() => {
            setAlertDialog(
              setAlertDialog({ open: false, title: "", text: "" })
            );
          }}
          style={styles.alertDialog}
          dismissable={
            alertDialog.dismissable ? alertDialog.dismissable : false
          }
        >
          <Dialog.Title style={styles.title}>{alertDialog.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.text}>{alertDialog.text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setAlertDialog({ open: false, title: "", text: "" });
                alertDialog.onPress ? alertDialog.onPress() : null;
              }}
              style={styles.btn}
              contentStyle={styles.btnText}
              color={colors.light}
              uppercase={false}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  alertDialog: {
    backgroundColor: colors.secondary,
    borderRadius: 24,
  },
  title: { color: colors.light },
  text: { color: colors.light },
  btn: {
    color: colors.light,
    textTransform: "none",
    borderRadius: 8,
    width: 48,
    height: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: colors.light,
    textTransform: "none",
    width: 48,
    height: 28,
  },
});
