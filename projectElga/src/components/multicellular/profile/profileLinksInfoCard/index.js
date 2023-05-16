import SvgUri from "expo-svg-uri";
import { Text, View, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../../constants/SvgUri";
import Styles from "./Styles";

function ProfileLinksInfoCard(props) {
  const { image, title, description, infoData = [] } = props.data;
  return (
    <View
      style={[
        Styles.card,
        {
          borderRadius: RFValue(24, 844),
          paddingHorizontal: RFValue(24, 844),
        },
      ]}
    >
      <View style={Styles.topBox}>
        <View style={Styles.image}>
          <Image source={image} style={Styles.icon} />
        </View>
        <View>
          <Text style={Styles.title}>{title}</Text>
          <Text style={Styles.desctiption}>{description}</Text>
        </View>
      </View>

      <View style={Styles.separators}></View>
      <View style={Styles.detailsBox}>
        {infoData &&
          infoData?.length > 0 &&
          infoData?.map((item) => {
            return (
              <Text style={Styles.text} key={item}>
                {item}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

export default ProfileLinksInfoCard;
