﻿// <auto-generated />
using MediXpress_Medicine_Service_Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MediXpress_Medicine_Service_Api.Migrations
{
    [DbContext(typeof(MedicineDbContext))]
    [Migration("20240612110943_migrationdb")]
    partial class migrationdb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MediXpress_Medicine_Service_Api.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CatName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tbl_Category");
                });

            modelBuilder.Entity("MediXpress_Medicine_Service_Api.Models.Medicine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("med_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int>("MedCost")
                        .HasColumnType("int");

                    b.Property<string>("MedDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MedImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MedName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MedPower")
                        .HasColumnType("int");

                    b.Property<string>("MedStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PharmacyId")
                        .HasColumnType("int");

                    b.Property<string>("PharmacyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("tbl_Medicines");
                });

            modelBuilder.Entity("MediXpress_Medicine_Service_Api.Models.Medicine", b =>
                {
                    b.HasOne("MediXpress_Medicine_Service_Api.Models.Category", "Category")
                        .WithMany("Medicines")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("MediXpress_Medicine_Service_Api.Models.Category", b =>
                {
                    b.Navigation("Medicines");
                });
#pragma warning restore 612, 618
        }
    }
}
