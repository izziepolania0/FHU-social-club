import { Query, type Models } from "appwrite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  account,
  databases,
  DB_ID,
  EVENTS_COLLECTION_ID,
} from "../lib/appwrite";

interface PublicEvent extends Models.Document {
  title: string;
  description: string;

  startAt: string;
  club: string;
  location: string;
  isPublic?: boolean;
}

export default function HomePublic() {
  const router = useRouter();
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await databases.listDocuments<PublicEvent>(
        DB_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.equal("isPublic", [true]),
          Query.orderAsc("startAt"),
          Query.limit(50),
        ]
      );
      setEvents(res.documents);
    } catch (err: any) {
      Alert.alert("Error loading events", err?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await account.deleteSession("current");
    } catch {
      // ignore
    } finally {
      setSigningOut(false);
      router.replace("/login");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderItem = ({ item }: { item: PublicEvent }) => {
    const startDate = new Date(item.startAt);
    const dateStr = startDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeStr = startDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDesc}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.badge}>{item.club}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Date:</Text>
          <Text style={styles.metaValue}>{dateStr}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Time:</Text>
          <Text style={styles.metaValue}>{timeStr}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Location:</Text>
          <Text style={styles.metaValue}>{item.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {}
        <Image
          source={{
            uri: "https://www.google.com/imgres?q=fhu&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100057694748554&imgrefurl=https%3A%2F%2Fwww.facebook.com%2FGoFHULions%2F&docid=0YL3RGfT0d2RyM&tbnid=FN6Q2PTNVrEneM&vet=12ahUKEwjX282n3tmQAxVk6ckDHbwIDjAQM3oECCEQAA..i&w=960&h=960&hcb=2&ved=2ahUKEwjX282n3tmQAxVk6ckDHbwIDjAQM3oECCEQAA",
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {}
        <View style={styles.headerRow}>
          <Text style={styles.title}>FHU Social Club Directory</Text>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutBtn}
            disabled={signingOut}
          >
            {signingOut ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.signOutText}>Sign Out</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Public Events</Text>

        {loading ? (
          <View style={{ paddingVertical: 24 }}>
            <ActivityIndicator />
          </View>
        ) : events.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming public events.</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(e) => e.$id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0A0A0A" },
  container: { flex: 1, backgroundColor: "#0A0A0A", paddingHorizontal: 16 },
  headerImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 12,
  },
  headerRow: {
    marginTop: 12,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 12,
    flex: 1,
  },
  signOutBtn: {
    backgroundColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signOutText: { color: "white", fontWeight: "700" },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
  },
  emptyText: { color: "#9CA3AF", marginTop: 8 },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  eventTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  eventDesc: { color: "#9CA3AF", marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 8 },
  badge: {
    color: "#D1FAE5",
    backgroundColor: "#065F46",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "700",
  },
  metaRow: { flexDirection: "row", marginBottom: 4 },
  metaLabel: { color: "#9CA3AF", width: 72 },
  metaValue: { color: "white", flexShrink: 1 },
});
