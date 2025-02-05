
library(tidyverse)
library(tidytext)
library(viridis)
library(ggiraph)
library(mdr)

data <- transcripts |>
  mutate(speaker_clean = case_when(
    grepl("Cobel", speaker) ~ "Cobel",
    speaker == "Mark W" ~ "Mark W",
    grepl("Mark", speaker) ~ "Mark",
    grepl("Helly", speaker) ~ "Helly",
    speaker == "Dylan’s son" ~ "Dylan’s son",
    grepl("Dylan", speaker) ~ "Dylan",
    grepl("Irv", speaker) ~ "Irving",
    grepl("Devon", speaker) ~ "Devon",
    grepl("Ricken", speaker) ~ "Ricken",
    grepl("Milchick", speaker) ~ "Milchick",
    grepl("Burt", speaker) ~ "Burt",
    grepl("Petey", speaker) ~ "Petey",
    grepl("Casey | Gemma", speaker) ~ "Ms. Casey",
    grepl("Reghabi", speaker) ~ "Reghabi",
    TRUE ~ "other"
  ),
  speaker = case_when(
    grepl("Cobel", speaker) ~ "Cobel",
    speaker == "Mark W" ~ "Mark W",
    grepl("Mark", speaker) ~ "Mark",
    grepl("Helly", speaker) ~ "Helly",
    speaker == "Dylan’s son" ~ "Dylan’s son",
    grepl("Dylan", speaker) ~ "Dylan",
    grepl("Irv", speaker) ~ "Irving",
    grepl("Devon", speaker) ~ "Devon",
    grepl("Ricken", speaker) ~ "Ricken",
    grepl("Milchick", speaker) ~ "Milchick",
    grepl("Burt", speaker) ~ "Burt",
    grepl("Petey", speaker) ~ "Petey",
    grepl("Casey | Gemma", speaker) ~ "Ms. Casey",
    grepl("Reghabi", speaker) ~ "Reghabi",
    TRUE ~ speaker
  )) |>
  filter(season == 1, episode == 1) |>
  unnest_tokens(word, dialogue) |>
  mutate(minute = minute(timestamp)) |>
  group_by(season, episode, minute, speaker_clean, speaker) |>
  summarise(value = n(), .groups = 'drop') |>
  complete(minute = 0:60,
           speaker = speaker,
           speaker_clean,
           season = season,
           episode = episode,
           fill = list(value = 0))


p <- ggplot(data, aes(tooltip = glue::glue("{minute} {speaker}: {value} words"))) +
  geom_bar_interactive(aes(x = minute, y = value, fill = speaker_clean),
                       stat = "identity") +
  scale_fill_viridis(discrete = TRUE) +
  theme_minimal() +
  theme(
    legend.position = "none",
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(1, 4), "cm")
  ) +
  coord_radial(inner.radius = 0.1) #+
# ylim(c(10, NA))


ggiraph::girafe(ggobj = p)


