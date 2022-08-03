import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import PreconfiguredScrollView from "../components/PreconfiguredScrollView";
import Title from "../components/Text/Title";
import COLORS from "../constants/colors";

export default function About({ params }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <PreconfiguredScrollView>
        <Title text="Was tut diese App?" />
        <Text style={[styles.text, { width: (width * 3) / 4 }]}>
          ProofSnap erstellt digitale Signaturen zu Fotos, die in der App
          angefertigt werden. Es ist eine Internetverbindung erforderlich.
        </Text>
        <Title text="Wie funktioniert das?" />
        <Text style={[styles.text, { width: (width * 3) / 4 }]}>
          Von einem mit ProofSnap frisch geschossenen Foto wird ein digitaler
          Fingerabdruck errechnet (Hash). Man kann anhand dieses Fingerabdrucks
          zweifelsfrei überprüfen, ob eine Datei verändert wurde. Dieser
          digitale Fingerabdruck wird digital Signiert. Diese Signaturen werden
          mittels des sog. Elliptische-Kurven-Digitalsignaturalgorithmus (ECDSA)
          erstellt.
        </Text>
        <Title text="Was ist die Idee hinter ProofSnap?" />
        <Text style={[styles.text, { width: (width * 3) / 4 }]}>
          Bei elektronischen Dokumenten wie auch Digitalfotos handelt es sich um
          sogenannte Augenscheinsobjekte nach § 371 ZPO, die der freien
          Beweiswürdigung nach § 286 ZPO unterliegen. Um einen Sachverhalt durch
          ein Foto als bewiesen anzusehen, muss das Gericht als Beweismaß
          rational begründet zur vollen Überzeugung der Unverfälschtheit des
          Bildes gelangen. Die grundsätzliche Manipulierbarkeit von digitalen
          Daten ist verbunden mit Unsicherheiten bezüglich ihrer Echtheit und
          begründet die fehlende regelmäßige Anerkennung als Beweis in
          juristischen Verfahren.
        </Text>
        <Title text="Welchen Anwendungsbereich hat ProofSnap?" />
        <Text style={[styles.text, { width: (width * 3) / 4 }]}>
          Denkbar sind breite Anwendungsmöglichkeiten, wie die Digitalisierung
          analoger Zahlungsbelege, Versicherungsfälle, das Ablesen von
          Zählerständen im privaten und gewerblichen Nutzungskontext, die
          Statusdokumentation bei Übergabe von Mietsachen und die allgemeine
          Beweismittelsicherung.
        </Text>
      </PreconfiguredScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.buttonText,
    fontSize: 20,
  },
});
