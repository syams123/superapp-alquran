import Head from "next/head";
import { useState } from "react";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import SurahList from "@/components/SurahList";

function JuzAmma({ allSurahList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode } = useColorMode();

  const surahList = allSurahList.filter((surah) =>
    surah.name.transliteration.id
      .toLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <>
      <Head>
        <title>Al-Quran Juz 30 (Juz Amma)</title>
        <meta
          name="description"
          content="Al-Qur'an 30 Juz beserta Terjemahan Bahasa Indonesia"
        />
      </Head>

      <PageHeader title="Juz Amma" goBack />
      <Box px="15px" pt="20px" as="main">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari surah di Juz Amma"
        />

        {surahList.length === 0 && (
          <Text
            fontSize="14px"
            color={colorMode === "dark" ? "gray.200" : "gray.600"}
            mt="20px"
          >
            Surah yang anda cari tidak ditemukan!
          </Text>
        )}

        <SurahList items={surahList} />
      </Box>
    </>
  );
}

export default JuzAmma;

export async function getStaticProps() {
  // Mengganti ke API gading.dev yang lebih stabil
  const res = await fetch("https://api.quran.gading.dev/surah/");
  const resultJson = await res.json();

  // Filter surah nomor 78 (An-Naba) sampai 114 (An-Nas)
  const allSurahList = resultJson.data.filter((surah) => surah.number >= 78);

  return {
    props: {
      allSurahList,
    },
  };
}
