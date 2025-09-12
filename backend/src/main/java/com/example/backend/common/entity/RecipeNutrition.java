package com.example.backend.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipe_nutrition")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeNutrition {

    @Id
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "recipe_id")
    private Long recipeId;

    // Macronutrients
    @Column(name = "Adjusted Protein (g)")
    private String adjustedProtein;

    @Column(name = "Protein (g)")
    private String protein;

    @Column(name = "Carbohydrate, by difference (g)")
    private String carbohydrate;

    @Column(name = "Total lipid (fat) (g)")
    private String totalFat;

    @Column(name = "Fiber, total dietary (g)")
    private String totalDietaryFiber;

    @Column(name = "Sugars, total (g)")
    private String totalSugars;

    // Energy
    @Column(name = "Energy (kcal)")
    private String energyKcal;

    @Column(name = "Energy (kJ)")
    private String energyKj;

    // Amino Acids
    @Column(name = "Alanine (g)")
    private String alanine;

    @Column(name = "Arginine (g)")
    private String arginine;

    @Column(name = "Aspartic acid (g)")
    private String asparticAcid;

    @Column(name = "Cystine (g)")
    private String cystine;

    @Column(name = "Glutamic acid (g)")
    private String glutamicAcid;

    @Column(name = "Glycine (g)")
    private String glycine;

    @Column(name = "Histidine (g)")
    private String histidine;

    @Column(name = "Hydroxyproline (g)")
    private String hydroxyproline;

    @Column(name = "Isoleucine (g)")
    private String isoleucine;

    @Column(name = "Leucine (g)")
    private String leucine;

    @Column(name = "Lysine (g)")
    private String lysine;

    @Column(name = "Methionine (g)")
    private String methionine;

    @Column(name = "Phenylalanine (g)")
    private String phenylalanine;

    @Column(name = "Proline (g)")
    private String proline;

    @Column(name = "Serine (g)")
    private String serine;

    @Column(name = "Threonine (g)")
    private String threonine;

    @Column(name = "Tryptophan (g)")
    private String tryptophan;

    @Column(name = "Tyrosine (g)")
    private String tyrosine;

    @Column(name = "Valine (g)")
    private String valine;

    // Minerals
    @Column(name = "Calcium, Ca (mg)")
    private String calcium;

    @Column(name = "Copper, Cu (mg)")
    private String copper;

    @Column(name = "Iron, Fe (mg)")
    private String iron;

    @Column(name = "Magnesium, Mg (mg)")
    private String magnesium;

    @Column(name = "Manganese, Mn (mg)")
    private String manganese;

    @Column(name = "Phosphorus, P (mg)")
    private String phosphorus;

    @Column(name = "Potassium, K (mg)")
    private String potassium;

    @Column(name = "Selenium, Se (g)")
    private String selenium;

    @Column(name = "Sodium, Na (mg)")
    private String sodium;

    @Column(name = "Zinc, Zn (mg)")
    private String zinc;

    // Vitamins
    @Column(name = "Vitamin A, IU (IU)")
    private String vitaminAIu;

    @Column(name = "Vitamin A, RAE (g)")
    private String vitaminARae;

    @Column(name = "Vitamin B-12 (g)")
    private String vitaminB12;

    @Column(name = "Vitamin B-12, added (g)")
    private String vitaminB12Added;

    @Column(name = "Vitamin B-6 (mg)")
    private String vitaminB6;

    @Column(name = "Vitamin C, total ascorbic acid (mg)")
    private String vitaminC;

    @Column(name = "Vitamin D (D2 + D3) (g)")
    private String vitaminD;

    @Column(name = "Vitamin D (IU)")
    private String vitaminDIu;

    @Column(name = "Vitamin D2 (ergocalciferol) (g)")
    private String vitaminD2;

    @Column(name = "Vitamin D3 (cholecalciferol) (g)")
    private String vitaminD3;

    @Column(name = "Vitamin E (alpha-tocopherol) (mg)")
    private String vitaminE;

    @Column(name = "Vitamin E, added (mg)")
    private String vitaminEAdded;

    @Column(name = "Vitamin K (phylloquinone) (g)")
    private String vitaminK;

    @Column(name = "Niacin (mg)")
    private String niacin;

    @Column(name = "Pantothenic acid (mg)")
    private String pantothenicAcid;

    @Column(name = "Riboflavin (mg)")
    private String riboflavin;

    @Column(name = "Thiamin (mg)")
    private String thiamin;

    // Folates
    @Column(name = "Folate, DFE (g)")
    private String folateDfe;

    @Column(name = "Folate, food (g)")
    private String folateFood;

    @Column(name = "Folate, total (g)")
    private String folateTotal;

    @Column(name = "Folic acid (g)")
    private String folicAcid;

    // Fatty Acids - Saturated
    @Column(name = "Fatty acids, total saturated (g)")
    private String totalSaturatedFattyAcids;

    @Column(name = "Fatty acids, total saturated 4:0 (g)")
    private String saturatedFattyAcids40;

    @Column(name = "Fatty acids, total saturated 6:0 (g)")
    private String saturatedFattyAcids60;

    @Column(name = "Fatty acids, total saturated 8:0 (g)")
    private String saturatedFattyAcids80;

    @Column(name = "Fatty acids, total saturated 10:0 (g)")
    private String saturatedFattyAcids100;

    @Column(name = "Fatty acids, total saturated 12:0 (g)")
    private String saturatedFattyAcids120;

    @Column(name = "Fatty acids, total saturated 14:0 (g)")
    private String saturatedFattyAcids140;

    @Column(name = "Fatty acids, total saturated 14:1 (g)")
    private String saturatedFattyAcids141;

    @Column(name = "Fatty acids, total saturated 16:0 (g)")
    private String saturatedFattyAcids160;

    @Column(name = "Fatty acids, total saturated 16:1 undifferentiated (g)")
    private String saturatedFattyAcids161;

    @Column(name = "Fatty acids, total saturated 18:0 (g)")
    private String saturatedFattyAcids180;

    @Column(name = "Fatty acids, total saturated 18:1 undifferentiated (g)")
    private String saturatedFattyAcids181;

    @Column(name = "Fatty acids, total saturated 18:2 undifferentiated (g)")
    private String saturatedFattyAcids182;

    @Column(name = "Fatty acids, total saturated 18:3 undifferentiated (g)")
    private String saturatedFattyAcids183;

    @Column(name = "Fatty acids, total saturated 18:4 (g)")
    private String saturatedFattyAcids184;

    @Column(name = "Fatty acids, total saturated 20:0 (g)")
    private String saturatedFattyAcids200;

    @Column(name = "Fatty acids, total saturated 20:1 (g)")
    private String saturatedFattyAcids201;

    @Column(name = "Fatty acids, total saturated 20:4 undifferentiated (g)")
    private String saturatedFattyAcids204;

    @Column(name = "Fatty acids, total saturated 20:5 n-3 (EPA) (g)")
    private String saturatedFattyAcids205Epa;

    @Column(name = "Fatty acids, total saturated 22:0 (g)")
    private String saturatedFattyAcids220;

    @Column(name = "Fatty acids, total saturated 22:1 undifferentiated (g)")
    private String saturatedFattyAcids221;

    @Column(name = "Fatty acids, total saturated 22:5 n-3 (DPA) (g)")
    private String saturatedFattyAcids225Dpa;

    @Column(name = "Fatty acids, total saturated 22:6 n-3 (DHA) (g)")
    private String saturatedFattyAcids226Dha;

    // Fatty Acids - Monounsaturated
    @Column(name = "Fatty acids, total monounsaturated (g)")
    private String totalMonounsaturatedFattyAcids;

    // Fatty Acids - Polyunsaturated
    @Column(name = "Fatty acids, total polyunsaturated (g)")
    private String totalPolyunsaturatedFattyAcids;

    @Column(name = "Fatty acids, total polyunsaturated 15:0 (g)")
    private String polyunsaturatedFattyAcids150;

    @Column(name = "Fatty acids, total polyunsaturated 16:1 c (g)")
    private String polyunsaturatedFattyAcids161c;

    @Column(name = "Fatty acids, total polyunsaturated 16:1 t (g)")
    private String polyunsaturatedFattyAcids161t;

    @Column(name = "Fatty acids, total polyunsaturated 17:0 (g)")
    private String polyunsaturatedFattyAcids170;

    @Column(name = "Fatty acids, total polyunsaturated 17:1 (g)")
    private String polyunsaturatedFattyAcids171;

    @Column(name = "Fatty acids, total polyunsaturated 18:1 c (g)")
    private String polyunsaturatedFattyAcids181c;

    @Column(name = "Fatty acids, total polyunsaturated 18:1 t (g)")
    private String polyunsaturatedFattyAcids181t;

    @Column(name = "Fatty acids, total polyunsaturated 18:2 CLAs (g)")
    private String polyunsaturatedFattyAcids182Clas;

    @Column(name = "Fatty acids, total polyunsaturated 18:2 i (g)")
    private String polyunsaturatedFattyAcids182i;

    @Column(name = "Fatty acids, total polyunsaturated 18:2 n-6 c,c (g)")
    private String polyunsaturatedFattyAcids182n6cc;

    @Column(name = "Fatty acids, total polyunsaturated 18:2 t not further defined (")
    private String polyunsaturatedFattyAcids182tNotDefined;

    @Column(name = "Fatty acids, total polyunsaturated 18:2 t,t (g)")
    private String polyunsaturatedFattyAcids182tt;

    @Column(name = "Fatty acids, total polyunsaturated 18:3 n-6 c,c,c (g)")
    private String polyunsaturatedFattyAcids183n6ccc;

    @Column(name = "Fatty acids, total polyunsaturated 20:2 n-6 c,c (g)")
    private String polyunsaturatedFattyAcids202n6cc;

    @Column(name = "Fatty acids, total polyunsaturated 20:3 undifferentiated (g)")
    private String polyunsaturatedFattyAcids203;

    @Column(name = "Fatty acids, total polyunsaturated 22:1 c (g)")
    private String polyunsaturatedFattyAcids221c;

    @Column(name = "Fatty acids, total polyunsaturated 22:1 t (g)")
    private String polyunsaturatedFattyAcids221t;

    @Column(name = "Fatty acids, total polyunsaturated 24:0 (g)")
    private String polyunsaturatedFattyAcids240;

    @Column(name = "Fatty acids, total polyunsaturated 24:1 c (g)")
    private String polyunsaturatedFattyAcids241c;

    // Trans Fatty Acids
    @Column(name = "Fatty acids, total trans (g)")
    private String totalTransFattyAcids;

    @Column(name = "Fatty acids, total trans-monoenoic (g)")
    private String totalTransMonoenoicFattyAcids;

    @Column(name = "Fatty acids, total trans-polyenoic (g)")
    private String totalTransPolyenoicFattyAcids;

    @Column(name = "Fatty acids, total trans-polyenoic 13:0 (g)")
    private String transPolyenoicFattyAcids130;

    @Column(name = "Fatty acids, total trans-polyenoic 15:1 (g)")
    private String transPolyenoicFattyAcids151;

    @Column(name = "Fatty acids, total trans-polyenoic 18:1-11 t (18:1t n-7) (g)")
    private String transPolyenoicFattyAcids18111t;

    @Column(name = "Fatty acids, total trans-polyenoic 18:3 n-3 c,c,c (ALA) (g)")
    private String transPolyenoicFattyAcids183n3cccAla;

    @Column(name = "Fatty acids, total trans-polyenoic 18:3i (g)")
    private String transPolyenoicFattyAcids183i;

    @Column(name = "Fatty acids, total trans-polyenoic 20:3 n-3 (g)")
    private String transPolyenoicFattyAcids203n3;

    @Column(name = "Fatty acids, total trans-polyenoic 20:3 n-6 (g)")
    private String transPolyenoicFattyAcids203n6;

    @Column(name = "Fatty acids, total trans-polyenoic 20:4 n-6 (g)")
    private String transPolyenoicFattyAcids204n6;

    @Column(name = "Fatty acids, total trans-polyenoic 21:5 (g)")
    private String transPolyenoicFattyAcids215;

    @Column(name = "Fatty acids, total trans-polyenoic 22:4 (g)")
    private String transPolyenoicFattyAcids224;

    // Sugars
    @Column(name = "Fructose (g)")
    private String fructose;

    @Column(name = "Galactose (g)")
    private String galactose;

    @Column(name = "Glucose (dextrose) (g)")
    private String glucose;

    @Column(name = "Lactose (g)")
    private String lactose;

    @Column(name = "Maltose (g)")
    private String maltose;

    @Column(name = "Starch (g)")
    private String starch;

    @Column(name = "Sucrose (g)")
    private String sucrose;

    // Carotenoids
    @Column(name = "Carotene, alpha (g)")
    private String alphaCarotene;

    @Column(name = "Carotene, beta (g)")
    private String betaCarotene;

    @Column(name = "Cryptoxanthin, beta (g)")
    private String betaCryptoxanthin;

    @Column(name = "Lutein + zeaxanthin (g)")
    private String luteinZeaxanthin;

    @Column(name = "Lycopene (g)")
    private String lycopene;

    // Tocopherols
    @Column(name = "Tocopherol, beta (mg)")
    private String betaTocopherol;

    @Column(name = "Tocopherol, delta (mg)")
    private String deltaTocopherol;

    @Column(name = "Tocopherol, gamma (mg)")
    private String gammaTocopherol;

    // Tocotrienols
    @Column(name = "Tocotrienol, alpha (mg)")
    private String alphaTocotrienol;

    @Column(name = "Tocotrienol, beta (mg)")
    private String betaTocotrienol;

    @Column(name = "Tocotrienol, delta (mg)")
    private String deltaTocotrienol;

    @Column(name = "Tocotrienol, gamma (mg)")
    private String gammaTocotrienol;

    // Sterols
    @Column(name = "Beta-sitosterol (mg)")
    private String betaSitosterol;

    @Column(name = "Campesterol (mg)")
    private String campesterol;

    @Column(name = "Cholesterol (mg)")
    private String cholesterol;

    @Column(name = "Phytosterols (mg)")
    private String phytosterols;

    @Column(name = "Stigmasterol (mg)")
    private String stigmasterol;

    // Other compounds
    @Column(name = "Alcohol, ethyl (g)")
    private String ethylAlcohol;

    @Column(name = "Ash (g)")
    private String ash;

    @Column(name = "Betaine (mg)")
    private String betaine;

    @Column(name = "Caffeine (mg)")
    private String caffeine;

    @Column(name = "Choline, total (mg)")
    private String totalCholine;

    @Column(name = "Dihydrophylloquinone (g)")
    private String dihydrophylloquinone;

    @Column(name = "Fluoride, F (g)")
    private String fluoride;

    @Column(name = "Menaquinone-4 (g)")
    private String menaquinone4;

    @Column(name = "Retinol (g)")
    private String retinol;

    @Column(name = "Theobromine (mg)")
    private String theobromine;

    @Column(name = "Water (g)")
    private String water;
}
