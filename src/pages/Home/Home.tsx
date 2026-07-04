import { useNavigate } from "react-router-dom";
import HeroCard from "@/components/shared/Hero/Hero";
import Button from "@/components/ui/Button/Button";
import { useMeasures } from "@/hooks/useMeasures";
import styles from "./Home.module.css";
import { useTgUser } from "@/hooks/useTgUser";
import ReminderCard from "@/components/shared/RemainderCard/RemainderCard";
import TrendChart from "@/components/shared/TrendChart/TrendChart";
import Card from "@/components/ui/Card/Card";
import Heart from "@/assets/heart";

export default function Home() {
  const { last, measures } = useMeasures();
  const navigate = useNavigate();
  const { firstName } = useTgUser();

  return (
    <div className={styles.page}>
      {/* Приветствие */}
      <div className={styles.greeting}>
        <div className={styles.greetingContent}>
          <p className={styles.sub}>Добрий день,</p>
          <h1 className={styles.name}>{firstName || "Гость"}</h1>
        </div>
      </div>

      {/* Hero */}
      <HeroCard measure={last} />

      {/* Кнопки ввода */}
      <div className={styles.actions}>
        <Button onClick={() => navigate("/add")}>+ Давление</Button>
        <Button variant="ghost" onClick={() => navigate("/add?type=pulse")}>
          + Пульс
        </Button>
      </div>
      <ReminderCard />
      <TrendChart measures={measures} />
      <Card>
        <p className={styles.note}>
          Это приложение было создано для самого дорого и любимого мне человека.
          <br />
          <br />
          "Я хочу, чтобы ты всегда была здорова и счастлива. Люблю тебя
          <Heart />
          <Heart />
          <Heart />"
        </p>
      </Card>
    </div>
  );
}
