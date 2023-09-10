"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Kozel from "../../../public/Kozel.svg";
import Smoke from "../../../public/Smoke.png";
import Owner from "../../../public/OwnerImg.svg";
// import NavBackImg from "../../../public/NavBackImg.png";
import leftCube from "../../../public/left_cube.svg";
import link1 from "../../../public/link1.svg";
import link2 from "../../../public/link2.svg";
import link3 from "../../../public/link3.svg";
import link1mobile from "../../../public/menu1phone.svg";
import link2mobile from "../../../public/menu2phone.svg";
import link3mobile from "../../../public/menu3phone.svg";

const Preview = () => {
  return (
    <div className={styles.previewWrapper}>
      <Image alt="Kozel" src={Kozel} className={styles.previewKozelImg} />
      <Image alt="Smoke" src={Smoke} className={styles.previewSmokeImg} />
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.textTitle}>
            <span>Shakita Hookah</span> - место атмосферы
          </h2>
          <p className={styles.textDescription}>
            Высокий уровень кальянной культуры и отличное качество сервиса- два
            главных компонента внутри нашей сети.
          </p>
        </div>
        <div className={styles.perviewButtonWrapper}>
          <p className={styles.textQuote}>
            {` “Опустоши свой разум. 
            Стань аморфным, бесформенным как вода.
            Когда воду наливают в чашку, она становится чашкой. 
            Когда воду наливают в чайник, она становится чайником. Когда воду наливают в бутылку, она
            становится бутылкой. 
            Вода может течь, а может крушить. 
            Будь водой,друг мой” 
            -Брюс Ли`}
          </p>
          <Link href={"/booking"} className={styles.perviewButtonBook}>
            Book a table
          </Link>
        </div>
      </div>
      <h3 className={styles.titlePart}>Про нас</h3>
      <div className={styles.contentAbout}>
        <div className={styles.abountPart}>
          <h4>ИСТОРИЯ СОЗДАНИЯ</h4>
          <span>
            {`При создании фирменного логотипа участвовало множество переменных.
            Лицо на логотипе - лицо ацтекского бога Тлалока, который уносил
            священный табачный дым на небо, чтобы создавать облака и небосвод. У
            ацтеков и индейцев табак и его дым священен, является неотъемлемой
            частю и единственным способом общения с ними. В современном мире
            отношения к табачному листу куда проще, но смысл неизменен. Можно
            заметить, что разговоры, общение, знакомства и времяпрепровождение в
            компании, ощутимо приятнее за современном аналогом "трубки мира".
            Кальян - сближает нас с богами и друг с другом. Непреложная истина,
            которая продолжит существование на века вперед.`}
          </span>
        </div>
        <div className={styles.abountPartOwner}>
          <Image alt="Owner" src={Owner} className={styles.ownerImg} />
          <div className={styles.abountOwnerText}>
            <p>Айк Лазарян</p>
            <span>
              Цель этого мира — показать всю свою глубину и необъятность,
              приобщить интересующихся к культуре и научиться наслаждаться уже
              не кальяном, а искусством.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.nav}>
        {/* <Link href={"menu"}>
          <Image alt="link1" src={link1} className={styles.link1} />
        </Link>
        <Link href={"loyalty"}>
          <Image alt="link3" src={link3} className={styles.link3} />
        </Link>
        <Link href={"news"}>
          <Image alt="link2" src={link2} className={styles.link2} />
        </Link> */}
        <div className={styles.linksRow}>
          <Link href={"loyalty"}>
            <Image alt="link3" src={link3} className={styles.link3} />
          </Link>
          <Link href={"menu"}>
            <Image alt="link1" src={link1} className={styles.link1} />
          </Link>
        </div>
        <Link href={"news"}>
          <Image alt="link2" src={link2} className={styles.link2} />
        </Link>
        {/* <Image alt="leftCube" src={leftCube} className={styles.left_cube} /> */}
      </div>

      <div className={styles.navMobile}>
        <Link href={"loyalty"}>
          <Image alt="link3" src={link1mobile} className={styles.link1mobile} />
        </Link>
        <Link href={"menu"}>
          <Image alt="link3" src={link2mobile} className={styles.link2mobile} />
        </Link>
        <Link href={"news"}>
          <Image alt="link3" src={link3mobile} className={styles.link3mobile} />
        </Link>
      </div>
    </div>
  );
};

export default Preview;
